import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/redux/hook/language/useLanguage";

const Header: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const { lang, changeLanguage } = useLanguage();

  return (
    <header className="container mx-auto px-2 py-3 md:p-5">
      <div className="flex flex-col min-[400px]:flex-row gap-y-3 md:items-center justify-between min-h-16 px-5 py-3 shadow-md">
        <Link to="/" className="flex items-center gap-5">
          <span className="text-lg font-bold">Logo</span>
        </Link>

        <div className="flex items-center gap-5 max-[400px]:w-full h-full">
          <div className="relative w-full md:w-auto">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              id="search"
              name="search"
              type="text"
              placeholder="Search game..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select
            value={lang}
            onValueChange={(value) => changeLanguage(value as "en" | "mm")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language">
                {lang === "en" ? "English" : "မြန်မာ"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mm">မြန်မာ</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
};

export default Header;
