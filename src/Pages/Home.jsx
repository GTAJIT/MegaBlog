// pages/Home.jsx
import React from "react";
import { Container } from "../components";
import {HeroSection, BlogsShow} from "../components/index"
// import Test from "../test/Test"
export default function Home() {
  return (
    <main className="w-full">
      <Container>
        {/* <Test /> */}
        <HeroSection />
        <BlogsShow />
      </Container>
    </main>
  );
}
