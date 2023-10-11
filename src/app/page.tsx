import { BsLightningCharge, BsShieldExclamation, BsSun } from "react-icons/bs";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white px-2">
      <h1 className='text-5xl font-bold mb-20'>chatGPT</h1>

      <div className="flex flex-row space-x-2 text-center overflow-y-auto md:space-y-0">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BsSun className="w-4 h-4" />
            <h3>Examples</h3>
          </div>

          <div className="space-y-2">
            <p className="infoText">&quot;Explain something to me&quot;</p>
            <p className="infoText">&quot;What is the difference between a dog and a cat?&quot;</p>
            <p className="infoText">&quot;What is the color of the sun?&quot;</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BsLightningCharge className="w-4 h-4" />
            <h3>Capabilities</h3>
          </div>

          <div className="space-y-2">
            <p className="infoText">Uses the GPT-3.5-Turbo Model</p>
            <p className="infoText">Messages are stored in Firebase&apos;s Firestore</p>
            <p className="infoText">Hot toast notifications when chatGPT is thinking</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BsShieldExclamation className="w-4 h-4" />
            <h3>Limitations</h3>
          </div>

          <div className="space-y-2">
            <p className="infoText">May occasionally generate incorrect information</p>
            <p className="infoText">May occasionally produce harmful instructions or biased content</p>
            <p className="infoText">Limited knowledge of world and events after 2021</p>
          </div>
        </div>
      </div>
    </div>
  )
}
