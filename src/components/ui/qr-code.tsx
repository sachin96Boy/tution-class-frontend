import { Button, QrCode as ChakraQrCode } from "@chakra-ui/react";
import * as React from "react";

export interface QrCodeProps
  extends Omit<ChakraQrCode.RootProps, "fill" | "overlay"> {
  fill?: string;
  overlay?: React.ReactNode;
  name: string;
}

export const QrCode = React.forwardRef<HTMLDivElement, QrCodeProps>(
  function QrCode(props, ref) {
    const { children, fill, name, overlay, ...rest } = props;
    return (
      <ChakraQrCode.Root
        encoding={{
          ecc: "H",
        }}
        ref={ref}
        {...rest}
      >
        <ChakraQrCode.Frame style={{ fill }}>
          <ChakraQrCode.Pattern />
        </ChakraQrCode.Frame>
        {overlay}
        {children && <ChakraQrCode.Overlay>{children}</ChakraQrCode.Overlay>}
        <ChakraQrCode.DownloadTrigger
          asChild
          fileName={name}
          mimeType="image/jpeg"
          quality={100}
        >
          <Button variant="outline" size="md" mt="3">
            Download
          </Button>
        </ChakraQrCode.DownloadTrigger>
      </ChakraQrCode.Root>
    );
  }
);
