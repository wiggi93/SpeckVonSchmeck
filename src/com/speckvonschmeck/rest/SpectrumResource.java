package com.speckvonschmeck.rest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.speckvonschmeck.kafka.SpectrumProducer;
import com.speckvonschmeck.models.Spectrum;


@Path("spectrum/")
public class SpectrumResource {
	
	StringBuffer response = new StringBuffer();		
	
	@POST
	@Path("sendSpectrum")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response sendSpectrum(String jsonString) {
		
		System.out.println(jsonString);
		Gson gson = new GsonBuilder().create();
//		Spectrum spectrum = gson.fromJson(jsonString, Spectrum.class);
//		SpectrumProducer.sendToKafka(spectrum);
		
		
		return Response.ok().build();
	}
	
	@GET
	@Path("getSparkInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSparkInfo(){

		String inputLine;
		
		URL url;
		try {
			url = new URL("http://localhost:4040/api/v1/applications");
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			
			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			
			while((inputLine = in.readLine()) != null){
				response.append(inputLine);
			}
			System.out.println(response.toString());
			in.close();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return Response.ok(response.toString()).build();
	}
}
