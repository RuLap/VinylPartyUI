import { createSystem, defaultConfig, defineRecipe, defineTokens } from "@chakra-ui/react"

const colors = defineTokens.colors({
  bg: { value: "gray.100" },
  btn: { value: "teal.500" }
})

const fonts = defineTokens.fonts({
  heading: { value: "Poppins, sans-serif" },
  body: { value: "Whyte, sans-serif" }
})

const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "light",
    borderRadius: "base"
  },
  variants: {
    variant: {
      primary: {
        rounded: "md",
        fontFamily: "heading",
        color: "teal.100",
        bg: "teal.500",
        _hover: {
          bg: "teal.600",
        }
      }
    },
  },
  defaultVariants: {
    variant: "primary"
  }
})

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors,
      fonts,      
    },
    semanticTokens: {
      colors: {
        background: { value: "{colors.bg}" }
      }
    },
    recipes: {
      button: buttonRecipe
    },
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px"
    },
  }
})