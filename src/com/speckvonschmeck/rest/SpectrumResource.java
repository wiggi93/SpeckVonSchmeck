package com.speckvonschmeck.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.speckvonschmeck.kafka.SpectrumProducer;
import com.speckvonschmeck.models.Spectrum;


@Path("spectra")
public class SpectrumResource {
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response serverinfo(String jsonString) {
		
		Gson gson = new GsonBuilder().create();
		Spectrum spectrum = gson.fromJson(jsonString, Spectrum.class);
		SpectrumProducer.sendToKafka(spectrum);

		
		return Response.ok().build();
	}
}
