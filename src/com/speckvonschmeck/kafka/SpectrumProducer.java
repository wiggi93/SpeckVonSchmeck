package com.speckvonschmeck.kafka;

import java.util.Properties;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.speckvonschmeck.models.Spectrum;

public class SpectrumProducer {
	static int i=0;

	public final static String KAFKA_URL = "localhost:9092";
	public final static String KAFKA_TOPIC = "speckvonschmeck";

	 /**
     * This method creates a Kafka Producer
     * Sends spectrum as json to Kafka Topic
     *
     * @param spectrum - spectrum as json
     */			
	public static void sendToKafka(String spectrum) {
			
			Properties props = new Properties();
			props.put("bootstrap.servers", KAFKA_URL);
			props.put("key.serializer", StringSerializer.class.getName());
			props.put("value.serializer", StringSerializer.class.getName());

			Producer<String, String> producer = new KafkaProducer<String, String>(props);
			
			ProducerRecord<String, String> record = new ProducerRecord<String, String>(KAFKA_TOPIC,spectrum);
			producer.send(record);
			producer.close();
			
			
		
	}

} 
