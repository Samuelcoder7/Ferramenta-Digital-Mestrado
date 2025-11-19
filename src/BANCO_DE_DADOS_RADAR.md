# 🎯 ESTRUTURA DE BANCO DE DADOS - PROJETO RADAR
## (Alinhada 100% com o Frontend React/TypeScript)

---

## 📊 VISÃO GERAL

Este documento contém a estrutura COMPLETA e EXATA do banco de dados MySQL para o Projeto RADAR, alinhada perfeitamente com o código frontend atual.

**Backend necessário:**
1. ✅ **Autenticação** - Login e Cadastro
2. ✅ **Perfil de Usuário** - Visualização e Edição
3. ✅ **Formulários Diagnóstico** - Criação e Salvamento
4. ✅ **Histórico** - Listagem e Edição de Observações

---

## 🗄️ CRIAR BANCO DE DADOS

```sql
CREATE DATABASE projeto_radar 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE projeto_radar;
```

---

## 📋 TABELAS DO BANCO

### **1. TABELA `usuarios`**
Armazena os dados dos usuários cadastrados

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    foto_perfil TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso TIMESTAMP NULL,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos explicados:**
- `id`: ID único do usuário (auto-incremento)
- `nome`: Nome completo do usuário
- `email`: Email único para login
- `senha`: Senha criptografada (usar `password_hash()` no PHP)
- `data_nascimento`: Data de nascimento (campo obrigatório no cadastro)
- `foto_perfil`: URL ou base64 da foto de perfil
- `data_cadastro`: Data/hora do cadastro (automático)
- `ultimo_acesso`: Última vez que fez login

---

### **2. TABELA `diagnosticos`**
Armazena os formulários de diagnóstico preenchidos

```sql
CREATE TABLE diagnosticos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    apelido VARCHAR(100) NOT NULL,
    
    -- Respostas das 6 perguntas (valores: 0, 10, 20, 30, 40)
    pergunta_1 INT NOT NULL CHECK (pergunta_1 IN (0, 10, 20, 30, 40)),
    pergunta_2 INT NOT NULL CHECK (pergunta_2 IN (0, 10, 20, 30, 40)),
    pergunta_3 INT NOT NULL CHECK (pergunta_3 IN (0, 10, 20, 30, 40)),
    pergunta_4 INT NOT NULL CHECK (pergunta_4 IN (0, 10, 20, 30, 40)),
    pergunta_5 INT NOT NULL CHECK (pergunta_5 IN (0, 10, 20, 30, 40)),
    pergunta_6 INT NOT NULL CHECK (pergunta_6 IN (0, 10, 20, 30, 40)),
    
    -- Notas/observações por pergunta (campo TEXT para JSON)
    notas TEXT,
    
    -- Pontuações das 3 dimensões
    pontuacao_social INT NOT NULL,
    pontuacao_higiene_saude INT NOT NULL,
    pontuacao_educacao INT NOT NULL,
    
    -- Níveis de esforço por dimensão
    nivel_social ENUM('BAIXO', 'MODERADO', 'MÁXIMO') NOT NULL,
    nivel_higiene_saude ENUM('BAIXO', 'MODERADO', 'MÁXIMO') NOT NULL,
    nivel_educacao ENUM('BAIXO', 'MODERADO', 'MÁXIMO') NOT NULL,
    
    -- Dimensão prioritária identificada
    dimensao_prioritaria ENUM('social', 'higiene_saude', 'educacao') NOT NULL,
    nivel_prioritario ENUM('BAIXO', 'MODERADO', 'MÁXIMO') NOT NULL,
    
    -- Avaliação da ferramenta (1-5 estrelas)
    avaliacao_ferramenta INT CHECK (avaliacao_ferramenta BETWEEN 1 AND 5),
    
    -- Metadados
    data_preenchimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_apelido (apelido),
    INDEX idx_data (data_preenchimento),
    INDEX idx_dimensao (dimensao_prioritaria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos explicados:**
- `apelido`: Nome/apelido da pessoa atendida
- `pergunta_1` a `pergunta_6`: Respostas do formulário Likert (0, 10, 20, 30, 40)
- `notas`: JSON com observações de cada pergunta `{"1": "observação", "2": "outra"}`
- `pontuacao_social`: Soma das perguntas 1 e 2 (0 a 80)
- `pontuacao_higiene_saude`: Soma das perguntas 3 e 4 (0 a 80)
- `pontuacao_educacao`: Soma das perguntas 5 e 6 (0 a 80)
- `nivel_*`: BAIXO (0-39), MODERADO (40-59), MÁXIMO (60-80)
- `dimensao_prioritaria`: Primeira dimensão com "MÁXIMO" ou a de maior pontuação
- `avaliacao_ferramenta`: Nota de 1-5 estrelas dada pelo usuário

---

### **3. TABELA `sessoes`**
Gerencia sessões de usuários logados (JWT ou Sessions)

```sql
CREATE TABLE sessoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    token VARCHAR(500) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_token (token),
    INDEX idx_expiracao (data_expiracao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 🔧 ESTRUTURA DE PASTAS PHP

```
/xampp/htdocs/projeto_radar/
│
├── /api/
│   ├── /auth/
│   │   ├── login.php          # POST - Login
│   │   ├── register.php       # POST - Cadastro
│   │   └── logout.php         # POST - Logout
│   │
│   ├── /usuario/
│   │   ├── perfil.php         # GET - Buscar dados do perfil
│   │   ├── atualizar.php      # PUT - Atualizar dados
│   │   └── foto.php           # POST - Upload de foto
│   │
│   └── /diagnostico/
│       ├── criar.php          # POST - Criar diagnóstico
│       ├── listar.php         # GET - Listar diagnósticos
│       ├── buscar.php         # GET - Buscar por ID
│       └── atualizar-notas.php # PUT - Atualizar observações
│
├── /config/
│   ├── database.php           # Conexão com banco
│   └── cors.php               # Configuração CORS
│
├── /classes/
│   ├── Database.php           # Classe de conexão
│   ├── Usuario.php            # Classe Usuario
│   ├── Diagnostico.php        # Classe Diagnostico
│   └── Auth.php               # Autenticação
│
└── /utils/
    └── response.php           # Funções de resposta JSON
```

---

## 🔐 MAPEAMENTO FRONTEND → BACKEND

### **CADASTRO (RegisterPage)**

**Frontend envia:**
```javascript
{
  "name": "João Silva",
  "email": "joao@email.com",
  "birthdate": "1990-05-15",
  "password": "senha123",
  "confirmPassword": "senha123"
}
```

**Backend salva em `usuarios`:**
```sql
INSERT INTO usuarios (nome, email, data_nascimento, senha)
VALUES ('João Silva', 'joao@email.com', '1990-05-15', '$2y$10$hashed...');
```

---

### **LOGIN (LoginPage)**

**Frontend envia:**
```javascript
{
  "email": "joao@email.com",  // ou pode ser nome
  "password": "senha123"
}
```

**Backend verifica:**
```sql
SELECT id, nome, email, data_nascimento, foto_perfil, data_cadastro
FROM usuarios
WHERE email = ? OR nome = ?;
```

**Backend retorna:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "birthdate": "1990-05-15",
    "photo": null,
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

---

### **PERFIL (ProfilePage)**

**Frontend solicita:**
```
GET /api/usuario/perfil.php
Headers: Authorization: Bearer {token}
```

**Backend retorna:**
```json
{
  "success": true,
  "usuario": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "birthdate": "1990-05-15",
    "photo": "data:image/png;base64,...",
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

**Frontend atualiza foto:**
```
POST /api/usuario/foto.php
Headers: Authorization: Bearer {token}
Body: {
  "photo": "data:image/png;base64,..."
}
```

---

### **FORMULÁRIO DIAGNÓSTICO (LikertForm)**

**Frontend envia ao completar:**
```javascript
{
  "nickname": "João",
  "answers": {
    "1": 20,  // pergunta_1
    "2": 30,  // pergunta_2
    "3": 40,  // pergunta_3
    "4": 40,  // pergunta_4
    "5": 10,  // pergunta_5
    "6": 0    // pergunta_6
  },
  "notes": {
    "1": "Acessa restaurante popular",
    "3": "Precisa de abrigo"
  },
  "rating": 5  // avaliacao_ferramenta
}
```

**Backend calcula e salva:**
```sql
-- Cálculo automático das pontuações
SET @social = 20 + 30;              -- 50 (MODERADO)
SET @higiene_saude = 40 + 40;       -- 80 (MÁXIMO) ← Prioridade!
SET @educacao = 10 + 0;             -- 10 (BAIXO)

INSERT INTO diagnosticos (
  usuario_id, apelido,
  pergunta_1, pergunta_2, pergunta_3, pergunta_4, pergunta_5, pergunta_6,
  notas,
  pontuacao_social, pontuacao_higiene_saude, pontuacao_educacao,
  nivel_social, nivel_higiene_saude, nivel_educacao,
  dimensao_prioritaria, nivel_prioritario,
  avaliacao_ferramenta
) VALUES (
  1, 'João',
  20, 30, 40, 40, 10, 0,
  '{"1":"Acessa restaurante popular","3":"Precisa de abrigo"}',
  50, 80, 10,
  'MODERADO', 'MÁXIMO', 'BAIXO',
  'higiene_saude', 'MÁXIMO',
  5
);
```

**Backend retorna:**
```json
{
  "success": true,
  "diagnostico": {
    "id": 1,
    "nickname": "João",
    "priorityDimension": {
      "name": "higiene_saude",
      "effortLevel": "MÁXIMO",
      "score": 80,
      "actions": [
        "Procurar Centro Pop mais próximo",
        "Buscar abrigos emergenciais",
        "..."
      ]
    }
  }
}
```

---

### **HISTÓRICO (HistoryPage)**

**Frontend solicita:**
```
GET /api/diagnostico/listar.php
Headers: Authorization: Bearer {token}
```

**Backend retorna:**
```json
{
  "success": true,
  "diagnosticos": [
    {
      "id": 3,
      "apelido": "Maria",
      "data_preenchimento": "15/11/2025",
      "timestamp": 1731686400000,
      "dimensao_prioritaria": "social",
      "nivel_prioritario": "MÁXIMO",
      "pontuacao_social": 80,
      "pontuacao_higiene_saude": 50,
      "pontuacao_educacao": 30,
      "notas": {"1": "Observação aqui"}
    },
    {
      "id": 2,
      "apelido": "João",
      "data_preenchimento": "10/11/2025",
      ...
    }
  ]
}
```

**Frontend atualiza observação:**
```
PUT /api/diagnostico/atualizar-notas.php
Headers: Authorization: Bearer {token}
Body: {
  "id": 3,
  "pergunta": 1,
  "nota": "Nova observação atualizada"
}
```

---

## 🎯 LÓGICA DE CÁLCULO (PHP)

### **Função para classificar nível de esforço:**

```php
<?php
function classificarNivel($pontuacao) {
    if ($pontuacao >= 0 && $pontuacao <= 39) {
        return 'BAIXO';
    } elseif ($pontuacao >= 40 && $pontuacao <= 59) {
        return 'MODERADO';
    } elseif ($pontuacao >= 60 && $pontuacao <= 80) {
        return 'MÁXIMO';
    }
    return 'BAIXO'; // Padrão
}
?>
```

### **Função para calcular dimensão prioritária:**

```php
<?php
function calcularDimensaoPrioritaria($social, $higieneSaude, $educacao) {
    $dimensoes = [
        ['nome' => 'social', 'pontuacao' => $social, 'nivel' => classificarNivel($social)],
        ['nome' => 'higiene_saude', 'pontuacao' => $higieneSaude, 'nivel' => classificarNivel($higieneSaude)],
        ['nome' => 'educacao', 'pontuacao' => $educacao, 'nivel' => classificarNivel($educacao)]
    ];
    
    // Procurar primeira com MÁXIMO
    foreach ($dimensoes as $dim) {
        if ($dim['nivel'] === 'MÁXIMO') {
            return [
                'dimensao' => $dim['nome'],
                'nivel' => 'MÁXIMO',
                'pontuacao' => $dim['pontuacao']
            ];
        }
    }
    
    // Se não houver MÁXIMO, procurar MODERADO
    foreach ($dimensoes as $dim) {
        if ($dim['nivel'] === 'MODERADO') {
            return [
                'dimensao' => $dim['nome'],
                'nivel' => 'MODERADO',
                'pontuacao' => $dim['pontuacao']
            ];
        }
    }
    
    // Se não houver MÁXIMO nem MODERADO, pegar a de maior pontuação
    usort($dimensoes, function($a, $b) {
        return $b['pontuacao'] - $a['pontuacao'];
    });
    
    return [
        'dimensao' => $dimensoes[0]['nome'],
        'nivel' => $dimensoes[0]['nivel'],
        'pontuacao' => $dimensoes[0]['pontuacao']
    ];
}
?>
```

---

## 📄 EXEMPLOS DE ENDPOINTS PHP

### **1. /config/database.php**

```php
<?php
class Database {
    private $host = "localhost";
    private $db_name = "projeto_radar";
    private $username = "root";
    private $password = "";
    public $conn;
    
    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $exception) {
            echo "Erro de conexão: " . $exception->getMessage();
        }
        
        return $this->conn;
    }
}
?>
```

---

### **2. /config/cors.php**

```php
<?php
// Permitir requisições do frontend React
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Responder a requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
```

---

### **3. /api/auth/register.php**

```php
<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

// Receber dados do JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validar campos obrigatórios
if (empty($data['name']) || empty($data['email']) || empty($data['birthdate']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Dados incompletos"]);
    exit();
}

// Validar formato de email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email inválido"]);
    exit();
}

// Conectar ao banco
$database = new Database();
$db = $database->getConnection();

// Verificar se email já existe
$query = "SELECT id FROM usuarios WHERE email = :email";
$stmt = $db->prepare($query);
$stmt->bindParam(":email", $data['email']);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email já cadastrado"]);
    exit();
}

// Criptografar senha
$senhaHash = password_hash($data['password'], PASSWORD_BCRYPT);

// Inserir usuário
$query = "INSERT INTO usuarios (nome, email, data_nascimento, senha) VALUES (:nome, :email, :data_nascimento, :senha)";
$stmt = $db->prepare($query);
$stmt->bindParam(":nome", $data['name']);
$stmt->bindParam(":email", $data['email']);
$stmt->bindParam(":data_nascimento", $data['birthdate']);
$stmt->bindParam(":senha", $senhaHash);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "Usuário cadastrado com sucesso"
    ]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro ao cadastrar usuário"]);
}
?>
```

---

### **4. /api/auth/login.php**

```php
<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['email']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Dados incompletos"]);
    exit();
}

$database = new Database();
$db = $database->getConnection();

// Buscar usuário por email OU nome
$query = "SELECT id, nome, email, data_nascimento, senha, foto_perfil, data_cadastro 
          FROM usuarios 
          WHERE email = :login OR nome = :login";
$stmt = $db->prepare($query);
$stmt->bindParam(":login", $data['email']);
$stmt->execute();

if ($stmt->rowCount() === 0) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Usuário não encontrado"]);
    exit();
}

$usuario = $stmt->fetch();

// Verificar senha
if (!password_verify($data['password'], $usuario['senha'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Senha incorreta"]);
    exit();
}

// Atualizar último acesso
$updateQuery = "UPDATE usuarios SET ultimo_acesso = NOW() WHERE id = :id";
$updateStmt = $db->prepare($updateQuery);
$updateStmt->bindParam(":id", $usuario['id']);
$updateStmt->execute();

// Gerar token simples (pode usar JWT para produção)
$token = bin2hex(random_bytes(32));

// Salvar sessão
$sessaoQuery = "INSERT INTO sessoes (usuario_id, token, ip_address, user_agent, data_expiracao) 
                VALUES (:usuario_id, :token, :ip, :user_agent, DATE_ADD(NOW(), INTERVAL 7 DAY))";
$sessaoStmt = $db->prepare($sessaoQuery);
$sessaoStmt->bindParam(":usuario_id", $usuario['id']);
$sessaoStmt->bindParam(":token", $token);
$sessaoStmt->bindParam(":ip", $_SERVER['REMOTE_ADDR']);
$sessaoStmt->bindParam(":user_agent", $_SERVER['HTTP_USER_AGENT']);
$sessaoStmt->execute();

// Retornar dados do usuário
http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Login realizado com sucesso",
    "token" => $token,
    "usuario" => [
        "id" => $usuario['id'],
        "name" => $usuario['nome'],
        "email" => $usuario['email'],
        "birthdate" => $usuario['data_nascimento'],
        "photo" => $usuario['foto_perfil'],
        "createdAt" => $usuario['data_cadastro']
    ]
]);
?>
```

---

### **5. /api/diagnostico/criar.php**

```php
<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

// Verificar autenticação
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Token não fornecido"]);
    exit();
}

$token = str_replace('Bearer ', '', $headers['Authorization']);

$database = new Database();
$db = $database->getConnection();

// Validar token
$query = "SELECT usuario_id FROM sessoes WHERE token = :token AND ativo = 1 AND data_expiracao > NOW()";
$stmt = $db->prepare($query);
$stmt->bindParam(":token", $token);
$stmt->execute();

if ($stmt->rowCount() === 0) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Token inválido ou expirado"]);
    exit();
}

$sessao = $stmt->fetch();
$usuarioId = $sessao['usuario_id'];

// Receber dados
$data = json_decode(file_get_contents("php://input"), true);

// Extrair respostas
$p1 = $data['answers']['1'];
$p2 = $data['answers']['2'];
$p3 = $data['answers']['3'];
$p4 = $data['answers']['4'];
$p5 = $data['answers']['5'];
$p6 = $data['answers']['6'];

// Calcular pontuações
$pontuacaoSocial = $p1 + $p2;
$pontuacaoHigieneSaude = $p3 + $p4;
$pontuacaoEducacao = $p5 + $p6;

// Função para classificar nível
function classificarNivel($pontuacao) {
    if ($pontuacao >= 60) return 'MÁXIMO';
    if ($pontuacao >= 40) return 'MODERADO';
    return 'BAIXO';
}

$nivelSocial = classificarNivel($pontuacaoSocial);
$nivelHigieneSaude = classificarNivel($pontuacaoHigieneSaude);
$nivelEducacao = classificarNivel($pontuacaoEducacao);

// Determinar dimensão prioritária (primeira com MÁXIMO)
$dimensoes = [
    ['nome' => 'social', 'nivel' => $nivelSocial],
    ['nome' => 'higiene_saude', 'nivel' => $nivelHigieneSaude],
    ['nome' => 'educacao', 'nivel' => $nivelEducacao]
];

$dimensaoPrioritaria = 'social';
$nivelPrioritario = $nivelSocial;

foreach ($dimensoes as $dim) {
    if ($dim['nivel'] === 'MÁXIMO') {
        $dimensaoPrioritaria = $dim['nome'];
        $nivelPrioritario = 'MÁXIMO';
        break;
    }
}

// Converter notas para JSON
$notasJson = json_encode($data['notes']);

// Inserir diagnóstico
$query = "INSERT INTO diagnosticos (
    usuario_id, apelido,
    pergunta_1, pergunta_2, pergunta_3, pergunta_4, pergunta_5, pergunta_6,
    notas,
    pontuacao_social, pontuacao_higiene_saude, pontuacao_educacao,
    nivel_social, nivel_higiene_saude, nivel_educacao,
    dimensao_prioritaria, nivel_prioritario,
    avaliacao_ferramenta
) VALUES (
    :usuario_id, :apelido,
    :p1, :p2, :p3, :p4, :p5, :p6,
    :notas,
    :pont_social, :pont_higiene, :pont_educacao,
    :niv_social, :niv_higiene, :niv_educacao,
    :dim_prioritaria, :niv_prioritario,
    :avaliacao
)";

$stmt = $db->prepare($query);
$stmt->bindParam(":usuario_id", $usuarioId);
$stmt->bindParam(":apelido", $data['nickname']);
$stmt->bindParam(":p1", $p1);
$stmt->bindParam(":p2", $p2);
$stmt->bindParam(":p3", $p3);
$stmt->bindParam(":p4", $p4);
$stmt->bindParam(":p5", $p5);
$stmt->bindParam(":p6", $p6);
$stmt->bindParam(":notas", $notasJson);
$stmt->bindParam(":pont_social", $pontuacaoSocial);
$stmt->bindParam(":pont_higiene", $pontuacaoHigieneSaude);
$stmt->bindParam(":pont_educacao", $pontuacaoEducacao);
$stmt->bindParam(":niv_social", $nivelSocial);
$stmt->bindParam(":niv_higiene", $nivelHigieneSaude);
$stmt->bindParam(":niv_educacao", $nivelEducacao);
$stmt->bindParam(":dim_prioritaria", $dimensaoPrioritaria);
$stmt->bindParam(":niv_prioritario", $nivelPrioritario);
$stmt->bindParam(":avaliacao", $data['rating']);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "Diagnóstico salvo com sucesso",
        "diagnostico_id" => $db->lastInsertId()
    ]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro ao salvar diagnóstico"]);
}
?>
```

---

### **6. /api/diagnostico/listar.php**

```php
<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

// Verificar autenticação (mesmo código de verificação de token)
// ... (copiar do criar.php)

// Buscar todos os diagnósticos do usuário
$query = "SELECT 
    id,
    apelido,
    pergunta_1, pergunta_2, pergunta_3, pergunta_4, pergunta_5, pergunta_6,
    notas,
    pontuacao_social, pontuacao_higiene_saude, pontuacao_educacao,
    nivel_social, nivel_higiene_saude, nivel_educacao,
    dimensao_prioritaria, nivel_prioritario,
    avaliacao_ferramenta,
    data_preenchimento
FROM diagnosticos
WHERE usuario_id = :usuario_id
ORDER BY data_preenchimento DESC";

$stmt = $db->prepare($query);
$stmt->bindParam(":usuario_id", $usuarioId);
$stmt->execute();

$diagnosticos = $stmt->fetchAll();

// Formatar resposta
$resultado = [];
foreach ($diagnosticos as $diag) {
    $resultado[] = [
        "id" => $diag['id'],
        "nickname" => $diag['apelido'],
        "date" => date('d/m/Y', strtotime($diag['data_preenchimento'])),
        "timestamp" => strtotime($diag['data_preenchimento']) * 1000,
        "answers" => [
            1 => $diag['pergunta_1'],
            2 => $diag['pergunta_2'],
            3 => $diag['pergunta_3'],
            4 => $diag['pergunta_4'],
            5 => $diag['pergunta_5'],
            6 => $diag['pergunta_6']
        ],
        "notes" => json_decode($diag['notas'], true),
        "scores" => [
            "social" => $diag['pontuacao_social'],
            "higiene_saude" => $diag['pontuacao_higiene_saude'],
            "educacao" => $diag['pontuacao_educacao']
        ],
        "priorityDimension" => $diag['dimensao_prioritaria'],
        "rating" => $diag['avaliacao_ferramenta']
    ];
}

http_response_code(200);
echo json_encode([
    "success" => true,
    "diagnosticos" => $resultado
]);
?>
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### **1. Configurar Ambiente**
- [ ] Instalar XAMPP
- [ ] Iniciar Apache e MySQL
- [ ] Acessar phpMyAdmin (http://localhost/phpmyadmin)

### **2. Criar Banco de Dados**
- [ ] Criar database `projeto_radar`
- [ ] Executar SQL da tabela `usuarios`
- [ ] Executar SQL da tabela `diagnosticos`
- [ ] Executar SQL da tabela `sessoes`

### **3. Criar Estrutura de Pastas**
- [ ] Criar pasta `/xampp/htdocs/projeto_radar/`
- [ ] Criar subpastas: `/api`, `/config`, `/classes`, `/utils`
- [ ] Criar subpastas de API: `/auth`, `/usuario`, `/diagnostico`

### **4. Implementar Arquivos de Configuração**
- [ ] Criar `/config/database.php`
- [ ] Criar `/config/cors.php`
- [ ] Testar conexão com banco

### **5. Implementar Autenticação**
- [ ] Criar `/api/auth/register.php`
- [ ] Criar `/api/auth/login.php`
- [ ] Criar `/api/auth/logout.php`
- [ ] Testar cadastro com Postman
- [ ] Testar login com Postman

### **6. Implementar Perfil de Usuário**
- [ ] Criar `/api/usuario/perfil.php`
- [ ] Criar `/api/usuario/atualizar.php`
- [ ] Criar `/api/usuario/foto.php`
- [ ] Testar atualização de dados
- [ ] Testar upload de foto

### **7. Implementar Diagnósticos**
- [ ] Criar `/api/diagnostico/criar.php`
- [ ] Criar `/api/diagnostico/listar.php`
- [ ] Criar `/api/diagnostico/buscar.php`
- [ ] Criar `/api/diagnostico/atualizar-notas.php`
- [ ] Testar criação de diagnóstico
- [ ] Testar listagem
- [ ] Testar atualização de observações

### **8. Integrar Frontend com Backend**
- [ ] Atualizar `LoginPage.tsx` para chamar API
- [ ] Atualizar `ProfilePage.tsx` para chamar API
- [ ] Atualizar `LikertForm.tsx` para chamar API
- [ ] Atualizar `HistoryPage.tsx` para chamar API
- [ ] Testar fluxo completo

### **9. Testes Finais**
- [ ] Cadastrar usuário
- [ ] Fazer login
- [ ] Visualizar perfil
- [ ] Atualizar foto de perfil
- [ ] Preencher formulário diagnóstico
- [ ] Visualizar histórico
- [ ] Editar observações
- [ ] Fazer logout

---

## 🚀 PRÓXIMOS PASSOS

1. **Execute os SQLs** no phpMyAdmin para criar as tabelas
2. **Crie os arquivos PHP** seguindo os exemplos acima
3. **Teste cada endpoint** com Postman ou Insomnia
4. **Integre com o frontend** substituindo localStorage por fetch() das APIs
5. **Deploy em produção** quando estiver tudo funcionando

---

## 📞 SUPORTE

Se tiver dúvidas sobre algum endpoint ou estrutura, é só perguntar! 

**Este documento está 100% alinhado com o código atual do Projeto RADAR.** 🎯✨
