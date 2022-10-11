//error! TS2786: 'Header' cannot be used as a JSX component.  Its return type 'void' is not a valid JSX element.
// suspected reason: it doesn't use props at all, its entirely HTML


// export default function Header() {
//         <header className="header">

//             <div className="menu-icons" onclick="openSidebar()">
//                 <span className="material-symbols-outlined">menu</span>
//             </div>

//             <div className="header-left">
//                 <span className="material-symbols-outlined">search</span>
//             </div>
//             <div className="header-right">
//                 <span className="material-symbols-outlined">notifications</span>
//                 <span className="material-symbols-outlined">email</span>
//                 <span className="material-symbols-outlined">account_circle</span>
//             </div>
//         </header>
// }

// let sidebarOpen = false;

// let sidebar = document.getElementById('sidebar');

// function openSidebar() {
//     if(!sidebarOpen) {
//         sidebar.classList.add("sidebar-resposive");
//         sidebarOpen = true;
//     }
// }