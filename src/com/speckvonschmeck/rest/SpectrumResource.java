package com.speckvonschmeck.rest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
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
	 
	/**
     * This method calls sendToKafka with incoming json
     *
     * @param jsonString - single spectrum as json
     * @return status code 200
     */
	@POST
	@Path("sendSpectrum")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response sendSpectrum(String jsonString) {
		
		SpectrumProducer.sendToKafka(jsonString);
		
		
		return Response.ok().build();
	}
	
	 /**
     * This method responses to Frontend with IDs of running Spark Applications
     *
     * @return IDs
     */
	@GET
	@Path("applications")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getRunningApplications(){

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
	
	
	 /**
     * This method responses to Frontend with currently running Spark Jobs
     * @param appId - Application ID
     * @return spark jobs
     */
	@GET
	@Path("sparkJobs/{appId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getRunningSparkJobs(@PathParam("appId") String appId){
		String inputLine;
		
		URL url;
		try {
			url = new URL("http://localhost:4040/api/v1/applications/"+appId+"/jobs");
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			
			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			
			while((inputLine = in.readLine()) != null){
				response.append(inputLine);
			}
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
