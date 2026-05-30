import Head from "next/head";
import GalleryPage from "@/components/Gallery/GalleryPage";

export default function Gallery() {
  return (
    <>
      <Head>
        <title>Gallery | Hrithik Shetty</title>
        <meta
          name="description"
          content="Photos, achievements, and memories from Hrithik Shetty."
        />
      </Head>
      <GalleryPage />
    </>
  );
}
