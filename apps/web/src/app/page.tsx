import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className="w-full">
      <div
        id="background-web"
        className="relative hidden h-[660px] w-full md:block "
      >
        <Image
          fill
          sizes="100vw"
          src="/hero-section.jpg"
          alt="hero"
          className="object-cover"
        ></Image>
        <div className="w-[960px] h-[480px] absolute left-[25%] bottom-[15%]">
          {' '}
          <Image
            fill
            sizes="100vw"
            src="/anggun.png"
            alt="hero"
            className="object-cover rounded-lg"
          ></Image>
        </div>
      </div>
    </main>
  );
}
