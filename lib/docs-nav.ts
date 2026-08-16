import type { I18nKey } from "@/lib/i18n";

export type DocNavLink = { id: string; label: I18nKey };
export type DocNavGroup = { group: I18nKey };
export type DocNavItem = DocNavLink | DocNavGroup;

export const DOC_NAV_TOP_ITEMS: readonly DocNavLink[] = [
  { id: "introduction", label: "docs.nav.intro" },
  { id: "quickstart", label: "docs.nav.quickstart" },
];

/**
 * Single source of truth for the General Tutorial sidebar. The order must
 * match the section order in TutorialPage: main sections first, then the
 * appendix group label, then the three manual-install sections.
 */
export const DOC_NAV_TUTORIAL_ITEMS: readonly DocNavItem[] = [
  { id: "client-pick", label: "docs.tutorial.pick.title" },
  { id: "workflow", label: "docs.tutorial.workflow.title" },
  { id: "scenarios", label: "docs.tutorial.scenarios.title" },
  { id: "recovery", label: "docs.tutorial.recovery.title" },
  { group: "docs.nav.appendixGroup" },
  { id: "app-install", label: "docs.nav.app" },
  { id: "install", label: "docs.nav.install" },
  { id: "agent-skill", label: "docs.nav.agentSkill" },
];

export function isNavLink(item: DocNavItem): item is DocNavLink {
  return "id" in item;
}
