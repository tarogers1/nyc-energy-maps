export interface IBuildingFeature {
	type: string;
	properties: {
		bin: string;
		cnstrct_yr: string;
		lstmoddate: string;
		lststatype: string;
		doitt_id: string;
		heightroof: string;
		feat_code: string;
		groundelev: string;
		shape_area: string;
		shape_len: string;
		base_bbl: string;
		mpluto_bbl: string;
		geomsource: string;
	};
	geometry: {
		type: string;
		coordinates: [[[[number, number]]]]
	};
}

export interface IBuildingsGJSON {
	type: string;
	features: IBuildingFeature[]
}

export interface IBGJAPIDATA {
	the_geom: {
		type: string;
		coordinates: [[[[number, number]]]];
	}
	bin: string;
	cnstrct_yr: string;
	lstmoddate: string;
	lststatype: string;
	doitt_id: string;
	heightroof: string;
	feat_code: string;
	groundelev: string;
	shape_area: string;
	shape_len: string;
	base_bbl: string;
	mpluto_bbl: string;
	geomsource: string;
}