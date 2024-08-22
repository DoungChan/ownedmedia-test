import React from "react";
import { Menu } from "lucide-react";
const Menubar = ({ className, size }) => {
   return (
      <div className={className}>
         <Menu size={size} />
      </div>
   );
};

export default Menubar;
