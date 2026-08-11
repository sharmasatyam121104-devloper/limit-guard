export interface PlayGroundApiListInterface {
  path: string;
  methods: string[]; 
}

export interface PlayGroundApiListResponseInterface {
  totalApis: number;
  routes: PlayGroundApiListInterface[];
}