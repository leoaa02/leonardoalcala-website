import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('note').title('Notes'),
      S.documentTypeListItem('reading').title('Reading List'),
      S.documentTypeListItem('nowPage').title('Now Page'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('tag').title('Tags'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['post', 'project', 'note', 'reading', 'nowPage', 'category', 'author', 'tag'].includes(
            item.getId()!,
          ),
      ),
    ])
