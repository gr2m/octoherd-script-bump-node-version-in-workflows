export type Workflow = {
  jobs?: Record<string, Job>;
};

export type Job = {
  steps?: Step[];
};

export type Step =
  | {
      uses: string;
      with?: Record<string, string | number | null>;
    }
  | { run: string };
