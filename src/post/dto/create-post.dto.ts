export class CreatePostDto {
  content: string;
  topic: string;
  files: File[];
}

interface File {
  id: string;
  url: string;
  originalName: string;
  index: number;
  type: string;
  size: number;
}
