import { HStack } from "@/components/ui/hstack";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { LinkText } from "@gluestack-ui/themed/build/components";
import { useEffect } from "react";

export default function Index() {
  return (
    <HStack className="justify-center items-center min-h-16" space="sm">
      <Text size="sm">Dashboard TODO</Text>
    </HStack>
  );
}
