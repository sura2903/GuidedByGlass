package com.example.guidedbyglass

import android.app.Activity
import android.content.ActivityNotFoundException
import android.content.Intent
import android.os.Bundle
import android.speech.RecognizerIntent
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import java.util.Locale

import android.Manifest
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import android.os.Handler
import android.os.Looper

class MainActivity : AppCompatActivity() {

    private lateinit var signImageView: ImageView
    private lateinit var resultTextView: TextView
    private lateinit var listenButton: Button

    private val SPEECH_REQUEST_CODE = 999
    private val RECORD_AUDIO_PERMISSION_CODE = 123

    private val handler = Handler(Looper.getMainLooper())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Use the IMAGE VIEW again (not VideoView)
        signImageView = findViewById(R.id.signImageView)
        resultTextView = findViewById(R.id.resultTextView)
        listenButton = findViewById(R.id.listenButton)

        checkMicPermission()

        // Optional: keep the button as a manual fallback
        listenButton.setOnClickListener {
            startSpeechRecognition()
        }
    }

    private fun checkMicPermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO)
            != PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.RECORD_AUDIO),
                RECORD_AUDIO_PERMISSION_CODE
            )
        } else {
            // Permission already granted → start listening immediately
            startSpeechRecognition()
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == RECORD_AUDIO_PERMISSION_CODE) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Now that we have permission, start listening
                startSpeechRecognition()
            } else {
                resultTextView.text = "Microphone permission is required."
            }
        }
    }

    private fun startSpeechRecognition() {
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(
                RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                RecognizerIntent.LANGUAGE_MODEL_FREE_FORM
            )
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault())
            putExtra(RecognizerIntent.EXTRA_PROMPT, "Say a word like 'hello'")
        }

        try {
            startActivityForResult(intent, SPEECH_REQUEST_CODE)
        } catch (e: ActivityNotFoundException) {
            resultTextView.text = "Speech recognition not supported"
        }
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == SPEECH_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK && data != null) {
                val results = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
                val text = results?.get(0) ?: ""
                // We got a valid result → let handleRecognizedText() decide when to listen again
                handleRecognizedText(text)
            } else {
                // No result (user canceled, silence, etc.) → show message & restart listening soon
                resultTextView.text = "Didn't catch that, listening again..."

                handler.postDelayed(
                    { startSpeechRecognition() },
                    3000L  // shorter delay is fine on failure
                )
            }
        }
    }

    private fun handleRecognizedText(text: String) {
        val lower = text.lowercase()
        resultTextView.text = "Recognized: $lower"

        // Map words to IMAGE resources (not video)
        val imageRes = when {
            lower.contains("hello") || lower.contains("hi") || lower.contains("hey") ->
                R.drawable.hello
            lower.contains("yes") || lower.contains("yeah") || lower.contains("yep") ->
                R.drawable.yes
            lower.contains("no") || lower.contains("nope") ->
                R.drawable.no
            lower.contains("thank") || lower.contains("thanks") || lower.contains("thank you") ->
                R.drawable.thankyou
            lower.contains("goodbye") ->
                R.drawable.goodbye
            else ->
                R.drawable.unknown
        }

        // Show the selected image
        signImageView.setImageResource(imageRes)

        // Cancel any pending callbacks, just to be safe
        handler.removeCallbacksAndMessages(null)

        // Wait a bit so the image is visible, then start listening again
        handler.postDelayed(
            { startSpeechRecognition() },
            3000L   // adjust if you want more/less time before next listen
        )
    }
}