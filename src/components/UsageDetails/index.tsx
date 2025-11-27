
export function TermsAndConditionsContent() {
    return (
      <div className="small" style={{ lineHeight: '1.8' }}>
        
        <section className="mb-4">
          <h6 className="fw-semibold mb-2">1. Acceptance of Terms</h6>
          <p className="text-muted">
            By accessing and using this UI and the Oberlin LLM Server, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, you must discontinue use immediately.
          </p>
        </section>
  
        <section className="mb-4">
          <h6 className="fw-semibold mb-2">2. Access to the Oberlin LLM Server</h6>
          <p className="text-muted">
            The Ollama service runs locally on the Oberlin College network and is only accessible through its API endpoint:
          </p>
          <p className="text-muted"><code>http://ollama.cs.oberlin.edu:11434</code></p>
          <p className="text-muted">
            You cannot log into the server directly; all interaction must occur via API calls from devices on the campus network.
          </p>
          <p className="text-muted">
            The currently available models include: <strong>gpt-oss</strong>, <strong>llama3.2</strong>, and <strong>mistral-small3.2</strong>.  
            <br />If you require additional models, you must consult your professor before requesting installation.
          </p>
        </section>
  
        <section className="mb-4">
          <h6 className="fw-semibold mb-2">3. Model Usage</h6>
          <p className="text-muted">
            The AI models provided through this interface and via the Oberlin LLM Server are owned and maintained by Oberlin College. You are responsible for ensuring that your usage complies with College policies, academic integrity standards, and all applicable laws.
          </p>
          <ul className="text-muted">
            <li>Use models only for lawful, ethical, and academically appropriate purposes</li>
            <li>You are responsible for verifying the accuracy of all model outputs</li>
            <li>Do not use model outputs for harmful, malicious, deceptive, or illegal activities</li>
          </ul>
        </section>
  
        <section className="mb-4">
          <h6 className="fw-semibold mb-2">4. API Request Behavior</h6>
          <p className="text-muted">
            All requests to the Oberlin LLM Server must be made through valid JSON-based API calls. For example:
          </p>
          <pre className="text-muted">
  {`curl -s http://ollama.cs.oberlin.edu:11434/api/generate -d '{
    "model": "gpt-oss",
    "prompt": "YOUR QUESTION HERE",
    "stream": false
  }'`}
          </pre>
          <p className="text-muted">
            You may optionally pipe responses through <code>jq</code> to view only the model output (e.g., <code>| jq -r '.response'</code>). Installation instructions for <code>jq</code> vary by platform and may require administrator permissions on your device.
          </p>
        </section>
  
        <section className="mb-4">
          <h6 className="fw-semibold mb-2">5. Disclaimer</h6>
          <p className="text-muted">
            <strong>Important:</strong> AI models—including Open Source and Google-based models—may generate inaccurate, biased, or incomplete information. All models are provided “as is” without warranties of any kind, expressed or implied.
          </p>
          <p className="text-muted">
            Oberlin College does not guarantee the correctness, reliability, or safety of any model-generated output.
          </p>
        </section>
  
        <section className="mb-4">
          <h6 className="fw-semibold mb-2">6. User Responsibility</h6>
          <p className="text-muted">By using this system, you acknowledge that:</p>
          <ul className="text-muted">
            <li>You assume full responsibility for the content you generate, use, or share</li>
            <li>You will not hold Oberlin College or UI developers liable for any outcomes from using model outputs</li>
            <li>You understand that model responses may be inaccurate, biased, or unsafe if misused</li>
          </ul>
        </section>
  
        <section className="mb-4">
          <h6 className="fw-semibold mb-2">7. Open Source Notice</h6>
          <p className="text-muted">
            This UI is open source. You may run it locally, modify it, or host your own instance. Contributions, suggestions, and improvements are welcome in accordance with open-source licensing terms.
          </p>
        </section>
  
        <section className="mb-4">
          <h6 className="fw-semibold mb-2">8. Limitation of Liability</h6>
          <p className="text-muted">
            Oberlin College, the UI developers, and any contributors are not liable for any direct, indirect, incidental, or consequential damages arising from use of the Oberlin LLM Server or this UI.
          </p>
        </section>
  
        <section className="mb-4">
          <h6 className="fw-semibold mb-2">9. Changes to Terms</h6>
          <p className="text-muted">
            These Terms and Conditions may be updated at any time. Continued use of the service implies acceptance of all changes.
          </p>
        </section>
  
        <div className="alert alert-warning mt-4">
          <strong>
            By using this service, you confirm that you have read, understood, and agreed to these Terms and Conditions.
          </strong>
        </div>
  
      </div>
    );
  }
  