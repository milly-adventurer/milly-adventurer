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


export interface PreviousTour {
	index: number;
	name: string;
	description: string;
	images: string[];
};

export interface NewTour {
  price: string;
  whatIncluded: string;
  expenses: string;
  code: string;
  preview: {
    date: string;
    name: string;
    description: string;
    image: null | string;
  };
  reivews: {
    name: string,
    text: string,
  }[],
  program: {
    day: number,
    short: {
      name: string,
      description: string,
      image: null | string,
    },
    full: {
      name: string,
      description: string,
      image: null | null,
    }
  }[];
};

export interface NewData {
  common: {
    faq: string;
		previous_tours: PreviousTour[];
  }
  tours: NewTour[];
}
