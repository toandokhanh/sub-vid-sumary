from pathlib import Path
import subprocess
import threading
from flask import Flask, request, jsonify
from security import (
    authorized,
    load_env,
    filename,
    language,
    choice,
    media_path,
    run_script,
)

HERE = Path(__file__).resolve().parent
load_env(HERE.parent / ".env")
app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 1024 * 1024
job_lock = threading.Lock()


@app.before_request
def authenticate_worker():
    if not authorized(request.headers.get("X-Service-Token")):
        return jsonify(error="Worker authentication required"), 401


@app.errorhandler(ValueError)
def invalid_input(error):
    return jsonify(error=str(error)), 400


@app.errorhandler(subprocess.SubprocessError)
def processing_failed(error):
    app.logger.warning("Media processing failed (%s)", type(error).__name__)
    return jsonify(error="Media processing failed"), 502


@app.errorhandler(OSError)
def file_error(error):
    return jsonify(error="Media file is unavailable"), 400


def subtitle_result(data, prefix):
    video = filename(data.get("video"))
    media = media_path(HERE.parent / "public/videos", video, ".mp4")
    if not media.is_file():
        raise ValueError("Video not found")
    args = [
        prefix + video,
        "-s",
        language(data.get("sourceLanguage")),
        "-d",
        language(data.get("targetLanguage")),
        "-noise",
        choice(data.get("algorithm"), {"no", "noise", "deep"}),
    ]
    output = run_script(HERE, "subtitle.py", args)
    keys = [
        "emty",
        "dateTime",
        "videoPath",
        "kb",
        "time",
        "sourceLanguage",
        "targetLanguage",
        "algorithm",
        "processingTime",
        "wavPath",
        "outputWavPath",
        "txtPath",
        "srtPath",
        "outputVideoPath",
    ]
    values = output.splitlines()[-1].split(", ")
    if len(values) != len(keys):
        raise ValueError("Unexpected worker result")
    return dict(zip(keys, values))


@app.post("/api/createSubtitle")
def subtitle():
    if not job_lock.acquire(blocking=False):
        return jsonify(error="Worker is busy"), 429
    try:
        return jsonify(subtitle_result(request.get_json() or {}, "../public/videos/"))
    finally:
        job_lock.release()


@app.post("/api/createSummarize")
def summarize():
    data = request.get_json() or {}
    video = filename(data.get("video"))
    if not media_path(HERE.parent / "public/videos", video, ".mp4").is_file():
        raise ValueError("Video not found")
    sentence = int(data.get("sentence", 0))
    if not 1 <= sentence <= 100:
        raise ValueError("Invalid sentence count")
    args = [
        "-l",
        language(data.get("language")),
        "-video",
        "../public/videos/" + video,
        "-noise",
        choice(data.get("noise"), {"no", "noise", "deep"}),
        "-summary",
        choice(
            data.get("summary"),
            {
                "lexrank",
                "textrank",
                "lsa",
                "luhn",
                "random",
                "reduction",
                "edmundson",
                "kl",
            },
        ),
        "-sentence",
        str(sentence),
    ]
    if not job_lock.acquire(blocking=False):
        return jsonify(error="Worker is busy"), 429
    try:
        output = run_script(HERE, "summary.py", args)
        keys = [
            "sourcePath",
            "sumarySourcePath",
            "dateTime",
            "pathVideo",
            "kb",
            "time",
            "language",
            "pathText",
            "aaaa",
            "a",
            "aa",
            "sentenceIP",
            "wordIP",
            "aaa",
            "sentenceOP",
            "wordOP",
            "noiseID",
            "summaryID",
            "aaa",
            "processingTime",
            "topic",
            "r1R",
            "r1P",
            "r1F",
            "r2R",
            "r2P",
            "r2F",
            "rlR",
            "rlP",
            "rlF",
        ]
        values = output.splitlines()[-1].split(", ")
        if len(values) != len(keys):
            raise ValueError("Unexpected worker result")
        return jsonify(dict(zip(keys, values)))
    finally:
        job_lock.release()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=6000)
