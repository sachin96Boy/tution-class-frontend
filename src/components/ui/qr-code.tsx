import { Button, QrCode as ChakraQrCode } from "@chakra-ui/react";
import * as React from "react";

export interface QrCodeProps
  extends Omit<ChakraQrCode.RootProps, "fill" | "overlay"> {
  fill?: string;
  overlay?: React.ReactNode;
}

export const QrCode = React.forwardRef<HTMLDivElement, QrCodeProps>(
  function QrCode(props, ref) {
    const { children, fill, overlay, ...rest } = props;
    return (
      <ChakraQrCode.Root ref={ref} {...rest}>
        <ChakraQrCode.Frame style={{ fill }}>
          <ChakraQrCode.Pattern />
        </ChakraQrCode.Frame>
        {overlay}
        {children && <ChakraQrCode.Overlay>{children}</ChakraQrCode.Overlay>}
        <ChakraQrCode.DownloadTrigger
          asChild
          fileName="qr-code.png"
          mimeType="image/png"
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
