import replicate
import os

os.environ["REPLICATE_API_TOKEN"] = 'Your_API_token'
# https://replicate.com/        <--  Test it hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

output = replicate.run(
    "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
    input={
        "width": 1024,
        "height": 1024,
        "prompt": "self-portrait of a girl walking under the rainbow, anime style",
        "scheduler": "K_EULER",
        "num_outputs": 1,
        "guidance_scale": 0,
        "negative_prompt": "worst quality, low quality",
        "num_inference_steps": 4
    }
)
print(output)