import Head from "next/head";
import ResumePage from "@/components/Resume/ResumePage";

export default function Resume() {
  return (
    <>
      <Head>
        <title>Resume | Hrithik Shetty</title>
        <meta
          name="description"
          content="Resume of Hrithik Shetty — Full Stack Developer."
        />
      </Head>
      <ResumePage />
    </>
  );
}
