import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, Moon, Sun, Bitcoin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/use-theme";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [location, navigate] = useLocation();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/mining-guides", label: "Mining Guides" },
    { href: "/hardware-reviews", label: "Hardware Reviews" },
    { href: "/news", label: "News" },
    { href: "/calculator", label: "Calculator" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-sm">
      <div className="container-layout">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bitcoin-bg rounded-full flex items-center justify-center">
              <Bitcoin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Bitcoin Mining Insider
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[hsl(var(--bitcoin))] ${
                  location === link.href ||
                  (link.href !== "/" && location.startsWith(link.href))
                    ? "text-[hsl(var(--bitcoin))]"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search, Theme Toggle, and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="hidden sm:block">
              {isSearchOpen ? (
                <form
                  onSubmit={handleSearch}
                  className="flex items-center space-x-2"
                >
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Mobile Search */}
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/search")}
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>

            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-medium transition-colors hover:text-[hsl(var(--bitcoin))] ${
                        location === link.href ||
                        (link.href !== "/" && location.startsWith(link.href))
                          ? "text-[hsl(var(--bitcoin))]"
                          : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
