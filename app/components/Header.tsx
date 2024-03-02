import Image from "next/image";
import Link from "next/link";
import HeaderImage from "@public/header.png";
//import styles from "@styles/Header.module.css";

export default function HeaderComponent() {
  return (
    <div className="text-center header">
      <Link href="/">
        <Image src={HeaderImage} className="rounded mx-auto d-block" alt="Popcorn time!" />
      </Link>
    </div>
  );
}
