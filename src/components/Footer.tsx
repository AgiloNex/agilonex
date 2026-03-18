const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p className="font-semibold text-foreground tracking-tight">
        Nexus<span className="text-primary">Tech</span> Solutions
      </p>
      <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default Footer;
