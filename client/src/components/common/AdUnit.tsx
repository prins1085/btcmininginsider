import { useEffect } from "react";

interface AdUnitProps {
  client: string;
  slot: string;
}

export default function AdUnit({ client, slot }: AdUnitProps) {
  useEffect(() => {
    try {
      // Request a new ad
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      // ignore errors during build/runtime
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
}
