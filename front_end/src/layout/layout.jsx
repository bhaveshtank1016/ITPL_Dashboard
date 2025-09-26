// // components/Layout.jsx
// import React from "react";
// import Sidebar from "../layout/sidebar";
// import Header from "../layout/Header";

// const Layout = ({ children }) => {
//   return (
//     <div className="flex ">
//       <Sidebar />
//       <main className="w-full  p-1">
//         { <Header /> }
//         {children}       {/* Current route content */}
//       </main>
//     </div>
//   );
// };

// export default Layout;
// components/Layout.jsx
import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

const Layout = ({ children }) => {
  const [expanded, setExpanded] = useState(true); // sidebar toggle ka control Layout me

  return (
    // Layout.jsx
    <div className="flex">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />
      <main className="flex-1 transition-all duration-300 p-1">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;
