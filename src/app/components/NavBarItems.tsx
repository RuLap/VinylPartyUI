"use client"

import { Box, Flex, Link as ChakraLink, Icon, Text, chakra, Stack } from "@chakra-ui/react";
import NextLink from "next/link";

interface NavBarItemsProps {
    navItems: { name: string, path: string }[]
}
export default function NavBarItems({ navItems }: NavBarItemsProps) {
    return (
    <>
        {navItems.map(({ name, path }) => (
            <ChakraLink
            key={path}
            as={NextLink}
            href={path}
            px={24}
            py={2}
            borderRadius="md"
            fontWeight="semibold"
            fontSize={{ base: "xl", md: "2xl" }}
            color="gray.700"
            position="relative"
            transition="all 0.3s ease"
            _hover={{
                textDecoration: "none",
                color: "purple.600",
                _after: {
                transform: "scaleX(1)",
                },
            }}
            _after={{
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                bg: "purple.600",
                transform: "scaleX(0)",
                transition: "transform 0.3s ease",
            }}
            >
            {name}
            </ChakraLink>
        ))}
      </>
    )
}