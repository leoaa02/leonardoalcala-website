import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {projectType} from './projectType'
import note from '../schemas/note'
import reading from '../schemas/reading'
import nowPage from '../schemas/nowPage'
import tag from '../schemas/tag'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    projectType,
    note,
    reading,
    nowPage,
    tag,
  ],
}
