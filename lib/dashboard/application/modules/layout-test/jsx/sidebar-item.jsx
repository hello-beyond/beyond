const SidebarItem = ({ href, icon, text }) => {
  return (
    <li>
      <a href={href}>
        <BeyondIcon icon={icon} />
        <span>{text}</span>
      </a>
    </li>
  );
};
