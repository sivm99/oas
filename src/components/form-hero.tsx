interface FormHeroProps {
  heading: string;
  para: string;
  caption: string | React.ReactElement;
}

function FormHero({ heading, para, caption }: FormHeroProps) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        {heading}
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{para}</p>
      <p className="text-xl text-muted-foreground hidden md:block">{caption}</p>
    </div>
  );
}

export default FormHero;
