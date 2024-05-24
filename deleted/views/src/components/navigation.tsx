"use client";

import React from "react";
import { useConfig } from "@melony/core";
import { NavigationItemProps } from "@melony/core";
import { NavigationItem } from "@melony/ui";
import { useLocation, useNavigate } from "react-router-dom";

export function Navigation() {
	// const navigate = useNavigate();
	// const location = useLocation();
	const { config } = useConfig();

	const collections = config?.collections || [];

	const ViewsFlatten: NavigationItemProps[] = [];

	// TODO: keeping reduce here for nested navigation if needed
	const Views = collections.reduce(
		(prev, curr) => {
			if (curr?.views) {
				prev[curr?.label || curr.slug] = (curr?.views || []).map((view) => {
					const viewItem = {
						title: view?.label || view.slug,
						to: `/c/${curr.slug}/v/${view.slug}`,
						icon: view?.icon || "Eye",
					};

					ViewsFlatten.push(viewItem);

					return viewItem;
				});
			}

			return prev;
		},
		{} as Record<string, NavigationItemProps[]>,
	);

	const defaultNav: Record<string, NavigationItemProps[]> = {};

	// if (ViewsFlatten.length > 0) {
	// 	defaultNav["Views"] = ViewsFlatten;
	// }

	if (collections.length > 0) {
		defaultNav["Collections"] = collections.map((collection) => ({
			title: collection?.label || collection.slug,
			to: `/${collection.slug}`,
			icon: "Folder",
		}));
	}

	const nav = config?.ui?.navigation || defaultNav;

	return (
		<div className="flex flex-col gap-2">
			{Object.keys(nav).map((title) => {
				return (
					<div key={title}>
						<div className="text-xs opacity-60 p-2">{title}</div>

						<nav className="flex flex-col gap-0.5">
							{(nav?.[title] || []).map((item) => {
								// const Icon: any = icons[item?.icon || "Folder"];

								return (
									<NavigationItem
										key={item.to}
										onClick={() => {
											// navigate(item.to);
										}}
										// icon={Icon && <Icon className="h-4 w-4 mr-2.5" />}
										title={item?.title}
										// active={location.pathname.includes(item.to)}
									/>
								);
							})}
						</nav>
					</div>
				);
			})}
		</div>
	);
}
