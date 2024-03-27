import React from "react";
import { HomeOutlined } from "@ant-design/icons";

import styles from "./MainMenu.module.scss";
import { Link, useLocation } from "react-router-dom";

type MenuItem = {
	key: string;
	label: string;
	icon: React.ReactNode;
	isHomePage?: boolean;
};

type MainMenuProps = {
	className?: string;
	style?: React.CSSProperties;
};

export const MainMenu: React.FC<MainMenuProps> = ({
	className = "",
	style = {},
}) => {
	const { pathname } = useLocation();
	const menuItems: MenuItem[] = [
		{
			key: "home",
			label: "Início",
			icon: <HomeOutlined />,
			isHomePage: true,
		},
	];

	const getUrl = (item: MenuItem) => `/${item.key}/`;

	const isCurrentPage = (item: MenuItem): boolean => {
		const pathElements = pathname.split("/").filter((element) => !!element);

		return (
			(!pathElements.length && !!item.isHomePage) ||
			pathElements?.[0] === item.key
		);
	};

	return (
		<nav className={`${styles.menu} ${className}`} style={style}>
			{menuItems.map((item) => (
				<Link
					key={item.key}
					className={`${styles.menuItem} ${
						isCurrentPage(item) ? styles.currentItem : ""
					}`}
					to={getUrl(item)}
				>
					{item.icon}
					<p>{item.label}</p>
				</Link>
			))}
		</nav>
	);
};
