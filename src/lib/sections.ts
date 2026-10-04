import { getEntry, render } from 'astro:content';

// The order sections appear on the page (and in the menu). Each id is the
// file name of a file in src/content/sections.
export const sectionOrder = ['video', 'entertainment', 'vendors', 'whatson', 'tickets', 'faqs', 'map', 'sponsors'] as const;
export type SectionId = (typeof sectionOrder)[number];

export async function loadSection(id: SectionId) {
  const entry = await getEntry('sections', id);
  if (!entry) throw new Error(`Missing section file src/content/sections/${id}.md`);
  const { Content } = await render(entry);
  return { ...entry.data, id, Content };
}

export async function loadSingle<C extends 'site' | 'tickets' | 'timeline' | 'map'>(collection: C, id: string) {
  const entry = await getEntry(collection, id);
  if (!entry) throw new Error(`Missing content file for ${collection}/${id}`);
  return entry.data;
}
