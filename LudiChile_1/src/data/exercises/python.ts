export interface Exercise {
  id: string;
  number: number;
  title: string;
  description: string;
  instructions: string;
  expectedOutput: string;
  initialCode?: string;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
}

export const pythonExercises: { [key: string]: Exercise } = {
  "01-setting-up": {
    id: "01-setting-up",
    number: 1,
    title: "Configuración Inicial",
    description:
      "¡Bienvenido al primer capítulo de La Leyenda de Python! El lenguaje de programación que estamos aprendiendo se llama Python, creado por un desarrollador llamado Guido van Rossum a principios de los años 90.",
    instructions:
      'Copia y pega esta línea de código en la línea 3:\n\nprint("hola")\n\nY luego presiona el botón "Ejecutar" y espera 1-2 segundos.',
    expectedOutput: "hola",
    initialCode: "# Escribe el código abajo ⌨️\n\n\n",
    testCases: [
      {
        input: 'print("hola")',
        expectedOutput: "hola",
      },
      {
        input: 'print("hi")',
        expectedOutput: "hi",
      },
    ],
  },
  "02-hello-world": {
    id: "02-hello-world",
    number: 2,
    title: "Hola Mundo",
    description:
      '¡Vamos a escribir nuestro primer programa en Python! Comenzaremos con el clásico programa "¡Hola, Mundo!".',
    instructions:
      'Escribe un programa que imprima "¡Hola, Mundo!" en la pantalla.',
    expectedOutput: "¡Hola, Mundo!",
    initialCode: "# Escribe tu código aquí\n\n",
    testCases: [
      {
        input: 'print("¡Hola, Mundo!")',
        expectedOutput: "¡Hola, Mundo!",
      },
    ],
  },
  "03-pattern": {
    id: "03-pattern",
    number: 3,
    title: "Patrón",
    description:
      "Ahora que sabes cómo imprimir texto, ¡vamos a crear un patrón simple usando caracteres ASCII!",
    instructions:
      "Escribe un programa que imprima el siguiente patrón:\n\n   *\n  ***\n *****\n*******",
    expectedOutput: "   *\n  ***\n *****\n*******",
    initialCode: "# Escribe tu código aquí\n\n",
    testCases: [
      {
        input: 'print("   *\\n  ***\\n *****\\n*******")',
        expectedOutput: "   *\n  ***\n *****\n*******",
      },
    ],
  },
  "04-initials": {
    id: "04-initials",
    number: 4,
    title: "Iniciales",
    description:
      "¡Vamos a crear arte ASCII con tus iniciales! Usaremos caracteres para formar letras grandes.",
    instructions:
      "Escribe un programa que imprima tus iniciales en arte ASCII. Por ejemplo, para 'AB':\n\n  #\n # #\n#####\n#   #\n#   #",
    expectedOutput: "  #\n # #\n#####\n#   #\n#   #",
    initialCode: "# Escribe tu código aquí\n\n",
    testCases: [
      {
        input: 'print("  #\\n # #\\n#####\\n#   #\\n#   #")',
        expectedOutput: "  #\n # #\n#####\n#   #\n#   #",
      },
    ],
  },
  "05-snail-mail": {
    id: "05-snail-mail",
    number: 5,
    title: "Correo Postal",
    description:
      "Vamos a practicar la impresión de múltiples líneas creando un sobre de correo postal en ASCII art.",
    instructions:
      "Crea un programa que imprima un sobre de correo postal usando caracteres ASCII:\n\n+------+\n|      |\n| [][] |\n|      |\n+------+",
    expectedOutput: "+------+\n|      |\n| [][] |\n|      |\n+------+",
    initialCode: "# Escribe tu código aquí\n\n",
    testCases: [
      {
        input: 'print("+------+\\n|      |\\n| [][] |\\n|      |\\n+------+")',
        expectedOutput: "+------+\n|      |\n| [][] |\n|      |\n+------+",
      },
    ],
  },
} as const;

// Asegurarnos de que los ejercicios estén disponibles
console.log("Ejercicios de Python cargados:", Object.keys(pythonExercises));
