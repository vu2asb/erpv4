"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const LoginPage = () => {
  return (
    <>
      <div>
        <main className="container flex w-full h-full flex-col items-center justify-center">
          <div>Logout Page!</div>
          {/* <Image
              src="../assets/Logo.svg"
              alt="Logo image"
              className="dark:invert"
              width={500}
              height={500}
              priority
            /> */}
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, facere voluptate? Odio nam earum, assumenda inventore non aut praesentium esse accusantium accusamus voluptas aperiam corporis beatae officia facere incidunt ipsum omnis, delectus expedita quis molestias nisi! Aliquid dolore labore dolorem quo illo quaerat, delectus cumque, natus enim voluptatibus ab unde est assumenda veniam ullam, recusandae dolores. Explicabo itaque sit ducimus quis fuga modi omnis cum quo, commodi nemo libero ipsa accusamus necessitatibus officiis? Porro molestias nesciunt odio aliquid quam recusandae animi, officia itaque cumque, sed atque natus qui perspiciatis. Adipisci consectetur quisquam aspernatur pariatur ipsam eos voluptas et repellendus eaque?</h4>
            <Image
              src="../assets/Logo.svg"
              alt="Logo image"
              className="dark:invert"
              width={500}
              height={500}
              priority
            />
        </main>
      </div>
    </>
  );
};

export default LoginPage;
