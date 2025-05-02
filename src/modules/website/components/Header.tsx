import React from "react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/redux/hook/language/useLanguage";

const Header: React.FC = () => {
  const { lang, changeLanguage } = useLanguage();

  return (
    <header className="container mx-auto px-2 py-3 md:p-5">
      <div className="flex flex-col min-[400px]:flex-row gap-y-3 items-center justify-between  min-h-16 px-5 py-3 shadow-lg rounded-lg">
        <Link to="/" className="flex flex-col sm:flex-row items-center gap-3">
          <img
            src="/assets/images/logo.jpg"
            className=" w-16 h-16 rounded-full"
            alt=""
          />
          <p className=" text-lg font-semibold ">LoRi Gaming Store</p>
        </Link>

        <div className="flex items-center justify-end gap-5 w-full max-w-[200px] h-full">
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
