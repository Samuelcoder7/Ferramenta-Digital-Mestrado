// Declaração para suportar importações de assets do Figma
declare module "figma:asset/*" {
  const content: string;
  export default content;
}

// Declaração para suportar importações de imagens JPG
declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}
