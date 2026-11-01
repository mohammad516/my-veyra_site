interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({ id, children, className = "" }: SectionProps) => (
  <section id={id} className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </section>
);

export default Section;
