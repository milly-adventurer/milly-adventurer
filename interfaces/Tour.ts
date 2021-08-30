export interface InfoItem {
  question: string,
  content: string,
  id: string,
}

export interface ProgramItem {
  name: string;
  description: string;
  picture: string | null;
}

export interface ProgramShortItem {
  name: string;
  description: string;
  image: string | null;
}

export interface QAItem {
  question: string;
  answer: string;
}

export interface Tour {
  date: string,
  name: string,
  description: string,
  code_word: string;
  is_current: boolean,
  price: string,
  info: InfoItem[];
  program: ProgramItem[];
  program_short: ProgramShortItem[];
  lastPictures: string[];
  id: string;
}

export type Tours = Tour[];

export interface Tab {
  id: string;
  name: string;
  description: string;
  pictures: string[];
}

interface Data {
  tours: Tour[];
  tabs: Tab[];
  qa: QAItem[];
}

export default Data;