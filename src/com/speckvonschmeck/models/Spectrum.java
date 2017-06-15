package com.speckvonschmeck.models;

import java.io.Serializable;
import java.util.List;

public class Spectrum implements Serializable{
	private static final long serialVersionUID = -7935537499853732631L;
	
	String charge, pepmass, rtinseconds, scans, title;
	List<Double> x;
	List<Double> y;

	public String getCharge() {
		return charge;
	}
	public void setCharge(String charge) {
		this.charge = charge;
	}
	public String getPepmass() {
		return pepmass;
	}
	public void setPepmass(String pepmass) {
		this.pepmass = pepmass;
	}
	public String getRtinseconds() {
		return rtinseconds;
	}
	public void setRtinseconds(String rtinseconds) {
		this.rtinseconds = rtinseconds;
	}
	public String getScans() {
		return scans;
	}
	public void setScans(String scans) {
		this.scans = scans;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<Double> getX() {
		return x;
	}
	public void setX(List<Double> x) {
		this.x = x;
	}
	public List<Double> getY() {
		return y;
	}
	public void setY(List<Double> y) {
		this.y = y;
	}
	@Override
	public String toString() {
		return "Spectrum [charge=" + charge + ", pepmass=" + pepmass + ", rtinseconds=" + rtinseconds + ", scans="
				+ scans + ", title=" + title + ", x=" + x + ", y=" + y + "]";
	}
	
}
