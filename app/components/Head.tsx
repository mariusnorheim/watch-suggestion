import Head from "next/head";

type HeadProps = {
  title: string | "Watch suggestion";
}

export default function HeadComponent ({ title }: HeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
