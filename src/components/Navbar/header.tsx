import HeaderView from "./headerView";
import { useState } from "react";

function Header() {
  const [expanded, setExpanded] = useState(false);

  function toggleItem(e: any) {
    var dropdown = e.nextElementSibling;
    var numOfElements = dropdown.children.length;
    if (e.parentNode.classList.contains("open")) {
      dropdown.style.height = numOfElements * 40 + "px";
      setTimeout(() => {
        dropdown.style.height = 0;
      }, 1);
      e.parentNode.classList.remove("open");
    } else {
      dropdown.style.height = numOfElements * 40 + "px";
      setTimeout(() => {
        dropdown.style.height = 'auto';
      }, 200);
      e.parentNode.classList.add("open");
    }
  }

  return (
    <HeaderView
      expanded={expanded}
      setExpanded={setExpanded}
      toggleItem={toggleItem}
    />
  );
}

export default Header;
