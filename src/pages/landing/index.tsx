const LandingPage = () => {
  return (
    <div className="mt-32 flex items-center justify-center text-center md:mt-14 lg:mt-52">
      <div className="z-10 flex flex-col items-center justify-center gap-2">
        <h1 className="font-inter relative max-w-2xl text-5xl font-extrabold leading-[0.9] tracking-[-2.5px] sm:text-6xl md:text-7xl">
          Where dreams meet <span>the road</span>
        </h1>

        <p className="mt-6 max-w-xl text-muted-foreground">Create, update, delete vehicle makes and models, super fast.</p>
      </div>
    </div>
  );
};

export default LandingPage;
