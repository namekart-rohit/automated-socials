type MediaResult = {
  linkedin: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
};

type LeadSocialsDetails = {
  linkedin: {
    profileUrl: string;
    followers: number | null;
    employees: number | null;
  } | null;
  instagram: {
    profileUrl: string;
    followers: number | null;
    followings: number | null;
    posts: number | null;
  } | null;
  facebook: {
    profileUrl: string;
    likes: number | null;
    followers: number | null;
  } | null;
  twitter: {
    profileUrl: string;
    followings: number | null;
    followers: number | null;
  } | null;
};

export type { MediaResult, LeadSocialsDetails };
