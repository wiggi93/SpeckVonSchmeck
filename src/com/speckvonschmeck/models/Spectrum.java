package com.speckvonschmeck.models;

public class Spectrum {
	Meta meta;
	Data data[];
	
	
	public Meta getMeta() {
		return meta;
	}
	public void setMeta(Meta meta) {
		this.meta = meta;
	}
	public Data[] getData() {
		return data;
	}
	public void setData(Data[] data) {
		this.data = data;
	}
	
}
